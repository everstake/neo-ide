import os
import subprocess
import base64
import time
import json


def code64_generator(text: str, is_compatible: bool = False):
    encoded_bytes = base64.b64encode(text.encode("utf-8"))
    code64 = str(encoded_bytes, "utf-8")
    if is_compatible:
        compatible = "--compatible"
    else:
        compatible = ""
    env_vars = os.environ.copy()
    env_vars["COMPILECODE"] = code64
    env_vars["COMPATIBLE"] = compatible
    sub = subprocess.Popen("/entrypoint.sh", env=env_vars, stdout=subprocess.PIPE)
    streamdata = sub.communicate()[0]
    streamdata = json.loads(streamdata)
    abi = base64.b64decode(streamdata['abi'])
    avm = base64.b64decode(streamdata['avm'])
    output = base64.b64decode(streamdata['output'])
    return str(abi, "utf-8").replace('\"', '').replace('\n', ''), str(avm, "utf-8").replace('\"', '').replace('\n', ''), str(output, "utf-8").replace('\"', '').replace('\n', '')
