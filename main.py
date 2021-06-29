from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
	name: str
	author: int
	clientid: int
	description: Optional[str] = None
	state: Optional[str] = None
	largeimage: Optional[str] = None
	smallimage: Optional[str] = None
	buttons: Optional[list[dict]] = None

@app.get("/items/{id}")
async def read(id: str):
	if id not in items:
		raise HTTPException(status_code=404, detail="Item not found")
	return {"id": id}

@app.get("/items/all")
async def read(id: str):
	if len(items) == 0:
		raise HTTPException(status_code=404, detail="No items found")
	return {"id": id}


@app.post("/items/")
async def create_item(item: Item):
    return item
