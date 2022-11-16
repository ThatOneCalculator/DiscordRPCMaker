module.exports = {
  packagerConfig: {
    icon: "./assets/icon",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-dmg",
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./assets/icon.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          icon: "./assets/icon.png",
        },
      },
    },
  ],
};
