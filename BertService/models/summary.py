from typing import List, Optional
from pydantic import BaseModel, Field
class Article(BaseModel):
    article: str = Field(...)
    order: Optional[ List[int] ] = None
'''
    class Config:
        schema_extra = {
            "example": {
                "article":"This is a sample string",
                "order":[0] 
            }
        }

class Article(BaseModel):
    article: str

class Index(BaseModel):
    index: str

class SentenceEmbedding(BaseModel):
    sentence_embedding: List[int]
'''