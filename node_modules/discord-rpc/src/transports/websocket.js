'use strict';

const EventEmitter = require('events');
const { browser } = require('../constants');

// eslint-disable-next-line
const WebSocket = browser ? window.WebSocket : require('ws');

const pack = (d) => JSON.stringify(d);
const unpack = (s) => JSON.parse(s);

class WebSocketTransport extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.ws = null;
    this.tries = 0;
  }

  async connect(tries = this.tries) {
    if (this.connected) {
      return;
    }
    const port = 6463 + (tries % 10);
    this.hostAndPort = `127.0.0.1:${port}`;
    const ws = this.ws = new WebSocket(
      `ws://${this.hostAndPort}/?v=1&client_id=${this.client.clientId}`,
      {
        origin: this.client.options.origin,
      },
    );
    ws.onopen = this.onOpen.bind(this);
    ws.onclose = ws.onerror = this.onClose.bind(this);
    ws.onmessage = this.onMessage.bind(this);
  }

  send(data) {
    if (!this.ws) {
      return;
    }
    this.ws.send(pack(data));
  }

  close() {
    if (!this.ws) {
      return;
    }
    this.ws.close();
  }

  ping() {} // eslint-disable-line no-empty-function

  onMessage(event) {
    this.emit('message', unpack(event.data));
  }

  onOpen() {
    this.emit('open');
  }

  onClose(e) {
    try {
      this.ws.close();
    } catch (err) {} // eslint-disable-line no-empty
    const derr = e.code >= 4000 && e.code < 5000;
    if (!e.code || derr) {
      this.emit('close', e);
    }
    if (!derr) {
      // eslint-disable-next-line no-plusplus
      setTimeout(() => this.connect(e.code === 1006 ? ++this.tries : 0), 250);
    }
  }
}

module.exports = WebSocketTransport;
