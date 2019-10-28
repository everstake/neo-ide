const text= 'from boa.interop.Neo.Runtime import Log, Notify\n\
from boa.interop.Neo.Storage import Get, Put, GetContext\n\
from boa.interop.Neo.Runtime import GetTrigger,CheckWitness\n\
from boa.builtins import concat\n\
\n\
\n\
def Main(operation, args):\n\
    nargs = len(args)\n\
    if nargs == 0:\n\
        print("No domain name supplied")\n\
        return 0\n\
\n\
    if operation == \'query\':\n\
        domain_name = args[0]\n\
        return QueryDomain(domain_name)\n\
\n\
    elif operation == \'delete\':\n\
        domain_name = args[0]\n\
        return DeleteDomain(domain_name)\n\
\n\
    elif operation == \'register\':\n\
        if nargs < 2:\n\
            print("required arguments: [domain_name] [owner]")\n\
            return 0\n\
        domain_name = args[0]\n\
        owner = args[1]\n\
        return RegisterDomain(domain_name, owner)\n\
\n\
    elif operation == \'transfer\':\n\
        if nargs < 2:\n\
            print("required arguments: [domain_name] [to_address]")\n\
            return 0\n\
        domain_name = args[0]\n\
        to_address = args[1]\n\
        return TransferDomain(domain_name, to_address)\n\
\n\
\n\
def QueryDomain(domain_name):\n\
    msg = concat("QueryDomain: ", domain_name)\n\
    Notify(msg)\n\
\n\
    context = GetContext()\n\
    owner = Get(context, domain_name)\n\
    if not owner:\n\
        Notify("Domain is not yet registered")\n\
        return False\n\
\n\
    Notify(owner)\n\
    return owner\n\
\n\
\n\
def RegisterDomain(domain_name, owner):\n\
    msg = concat("RegisterDomain: ", domain_name)\n\
    Notify(msg)\n\
\n\
    if not CheckWitness(owner):\n\
        Notify("Owner argument is not the same as the sender")\n\
        return False\n\
\n\
    context = GetContext()\n\
    exists = Get(context, domain_name)\n\
    if exists:\n\
        Notify("Domain is already registered")\n\
        return False\n\
\n\
    Put(context, domain_name, owner)\n\
    return True\n\
\n\
\n\
def TransferDomain(domain_name, to_address):\n\
    msg = concat("TransferDomain: ", domain_name)\n\
    Notify(msg)\n\
\n\
    context = GetContext()\n\
    owner = Get(context, domain_name)\n\
    if not owner:\n\
        Notify("Domain is not yet registered")\n\
        return False\n\
\n\
    if not CheckWitness(owner):\n\
        Notify("Sender is not the owner, cannot transfer")\n\
        return False\n\
\n\
    if not len(to_address) != 34:\n\
        Notify("Invalid new owner address. Must be exactly 34 characters")\n\
        return False\
\n\
    Put(context, domain_name, to_address)\n\
    return True\n\
\n\
\n\
def DeleteDomain(domain_name):\n\
    msg = concat("DeleteDomain: ", domain_name)\n\
    Notify(msg)\n\
\n\
    context = GetContext()\n\
    owner = Get(context, domain_name)\n\
    if not owner:\n\
        Notify("Domain is not yet registered")\n\
        return False\n\
\n\
    if not CheckWitness(owner):\n\
        Notify("Sender is not the owner, cannot transfer")\n\
        return False\n\
\n\
    Delete(context, domain_name)\n\
    return True\
'
export default text;