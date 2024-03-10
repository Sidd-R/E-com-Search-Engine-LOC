from langchain.llms import GooglePalm
from langchain.prompts import PromptTemplate

api_key = 'AIzaSyCPedFtmBWPyhbi1LxHnPku2fqNWQhdB5s'

llm = GooglePalm(google_api_key=api_key, temperature=0.2)

prompt = PromptTemplate.from_template("""You are an assistant to help customers. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Answer in proper format in one sentence.
Question: {question} 

Context: {context} 

Answer: """)
def query(question,details):
  msg = prompt.format(question=question, context=details)

  # print(msg)

  response = llm(msg)

  return response
  
# query("What is the capital of India?","India is a country in South Asia. It is the seventh-largest country by land area, and the second-most populous country, after China. The capital of India is New Delhi.")