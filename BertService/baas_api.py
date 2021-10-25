from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel

import numpy as np

import torch
from transformers import BertTokenizer, BertModel

# OPTIONAL: if you want to have more information on what's happening, activate the logger as follows
import logging
#logging.basicConfig(level=logging.INFO)

import matplotlib.pyplot as plt
from baas import generate_sentence_embeddings

app = FastAPI()

class Sentence(BaseModel):
    sentence: str

class SentenceEmbedding(BaseModel):
    sentence_embedding: List[int]

@app.get("/embedding/")
async def get_embeddings(sentence:str,response_body=SentenceEmbedding):
    # Load pre-trained model tokenizer (vocabulary)
    print(sentence)
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    # Load pre-trained model (weights)
    model = BertModel.from_pretrained('bert-base-uncased',
                                    output_hidden_states = True, # Whether the model returns all hidden-states.
                                    )
    sentence_embedding = generate_sentence_embeddings(model,tokenizer,sentence)
    sentence_embedding = {"sentence_embedding":sentence_embedding.tolist()}
    return sentence_embedding


