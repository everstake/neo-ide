from locust import HttpLocust, TaskSet, task
from flask import jsonify


class UserBehavior(TaskSet):
   def on_start(self):
       self.client.get("/")

   @task(1)
   def comment(self):
       data ={
           "text": ["def Main():\n", "  print(\"Hello World\")\n", "  return True"],
           "filename": "my_comment"
       }
  #     data = jsonify(data)
       self.client.post("/build_avm/py", json=data)


class WebsiteUser(HttpLocust):
   task_set = UserBehavior
   min_wait = 1000
   max_wait = 2000