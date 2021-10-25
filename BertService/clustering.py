import requests
from multiprocessing import Pool
import numpy as np
from sklearn.cluster import KMeans
import re
from sklearn.metrics import pairwise_distances_argmin_min
import time
from baas import generate_sentence_embeddings
from transformers import BertTokenizer, BertModel


def req(sentence):
    #body = requests.get("http://localhost:8000/embedding/",params={'sentence': sentence})
    #return body.json()["sentence_embedding"]
     # Load pre-trained model tokenizer (vocabulary)
    print(sentence)
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    # Load pre-trained model (weights)
    model = BertModel.from_pretrained('bert-base-uncased',
                                    output_hidden_states = True, # Whether the model returns all hidden-states.
                                    )
    sentence_embedding = generate_sentence_embeddings(model,tokenizer,sentence)
    sentence_embedding = {"sentence_embedding":sentence_embedding.tolist()}
    return sentence_embedding['sentence_embedding']

def clean(sentences):
    sentences = re.sub("\\n","",sentences)
    return sentences


def gen_summary(sentences):
    start = time.time()
    sentences = sentences.split(".")
    sentences = [token for token in sentences if token!='']
    i = 0
    rem = len(sentences)%4
    vectors = []
    if rem!=0:
        with Pool(rem) as p:
            vectors.extend(p.map(req,sentences[0:rem]))
    for i in range(rem,len(sentences),4):
        with Pool(4) as p:
            vectors.extend(p.map(req, sentences[i:i+4]))
    vectors = np.array(vectors)
    print(vectors.shape)
    end = time.time()
    print(end-start)
    n_clusters = int(np.ceil(len(vectors)/4))
    kmeans = KMeans(n_clusters=n_clusters, random_state=0)
    kmeans = kmeans.fit(vectors)
    avg = []
    closest = []
    for j in range(n_clusters):
        idx = np.where(kmeans.labels_ == j)[0]
        avg.append(np.mean(idx))
    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_,vectors)
    ordering = sorted(range(n_clusters), key=lambda k: avg[k])
    summary = '.'.join([sentences[closest[idx]] for idx in ordering])
    print('Clustering Finished')
    print(summary)
    return ordering        

if __name__=="__main__":

    start = time.time()
    with open("data.txt","r") as f:
        s1 = f.read()
        s1 = clean(s1)
        sentences = s1.split(".")
        sentences = [token for token in sentences if token!='']
        i = 0
        rem = len(sentences)%8
        vectors = []
        if rem!=0:
            with Pool(rem) as p:
               vectors.extend(p.map(req,sentences[0:rem]))
        for i in range(rem,len(sentences),8):
            with Pool(8) as p:
               vectors.extend(p.map(req, sentences[i:i+8]))
        vectors = np.array(vectors)
        print(vectors.shape)
        end = time.time()
        print(end-start)
        n_clusters = int(np.ceil(len(vectors)/4))
        kmeans = KMeans(n_clusters=n_clusters, random_state=0)
        kmeans = kmeans.fit(vectors)
        avg = []
        closest = []
        for j in range(n_clusters):
            idx = np.where(kmeans.labels_ == j)[0]
            avg.append(np.mean(idx))
        closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_,vectors)
        ordering = sorted(range(n_clusters), key=lambda k: avg[k])
        summary = '.'.join([sentences[closest[idx]] for idx in ordering])
        print('Clustering Finished')
        print(summary)



