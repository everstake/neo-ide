from locust import HttpLocust, TaskSet, task
from flask import jsonify


class UserBehavior(TaskSet):
    def on_start(self):
        self.client.get("/")

    @task(1)
    def comment(self):
        data ={
           "text": "def Main():\n   print(\"Hello World\")\n   return True",
           "filename": "my_comment.py"
       }
        #data = jsonify(data)
        self.client.post("/build_avm/py", json=data)

    @task(1)
    def new_comment(self):
       data ={
           "text": "using Neo.SmartContract.Framework; namespace SumSmartContract { public class Contract : SmartContract { public static int Main(int a, int b) { var c = a * b; return c; } } }"
       }
       self.client.post("/build_avm/cs", json=data)


class WebsiteUser(HttpLocust):
   task_set = UserBehavior
   min_wait = 1000
   max_wait = 2000