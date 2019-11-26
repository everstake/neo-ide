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
    abi = streamdata['abi']
    avm = streamdata['avm']
    output = streamdata['output']
    return abi, avm, output

