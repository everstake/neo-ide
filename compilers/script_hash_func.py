import binascii
import hashlib


class SerializableMixin(object):
    """ISerializable InterFace"""

    def Serialize(self, writer):
        pass

    def Deserialize(self, reader):
        pass

    def ToArray(self):
        pass


class TrackableMixin(object):

    def __init__(self):
        self.Key = None
        self.TrackingState = None

class UIntBase(SerializableMixin):

    def __init__(self, num_bytes, data=None):
        """
        Create an instance.
        Args:
            num_bytes: (int) the length of data in bytes
            data: (bytes, bytearray; optional) the raw data
        Raises:
            ValueError: if the input `num_bytes` != the length of the input `data`
            TypeError: if the input `data` is not bytes or bytearray
        """
        super(UIntBase, self).__init__()
        self.__hash = None
        if data is None:
            self.Data = bytearray(num_bytes)

        else:
            if len(data) != num_bytes:
                raise ValueError("Invalid UInt: data length {} != specified num_bytes {}".format(len(data), num_bytes))

            if type(data) is bytes:
                self.Data = bytearray(data)
            elif type(data) is bytearray:
                self.Data = data
            else:
                raise TypeError(f"{type(data)} is invalid")

        self.__hash = self.GetHashCode()

    @property
    def Size(self):
        return len(self.Data)

    def GetHashCode(self):
        """uint32 identifier"""
        slice_length = 4 if len(self.Data) >= 4 else len(self.Data)
        return int.from_bytes(self.Data[:slice_length], 'little')

    def Serialize(self, writer):
        writer.WriteBytes(self.Data)

    def Deserialize(self, reader):
        self.Data = reader.ReadBytes(self.Size)
        self.__hash = self.GetHashCode()

    def ToArray(self):
        return self.Data

    def ToString(self):
        db = bytearray(self.Data)
        db.reverse()
        return db.hex()

    def ToString2(self):
        return self.Data.hex()

    def To0xString(self):
        return '0x%s' % self.ToString()

    def ToBytes(self):
        return bytes(self.ToString(), encoding='utf-8')

    def __eq__(self, other):
        if other is None:
            return False

        if not isinstance(other, UIntBase):
            return False

        if other is self:
            return True

        if self.Data == other.Data:
            return True

        return False

    def __hash__(self):
        return self.__hash

    def __str__(self):
        return self.ToString()

    def CompareTo(self, other):
        """
        Compare with another UIntBase
        Raises:
            TypeError: if the input `other` is not UIntBase
            ValueError: if the length of `self` != length of the input `other`
        """
        if not isinstance(other, UIntBase):
            raise TypeError('Cannot compare %s to type %s' % (type(self).__name__, type(other).__name__))

        x = self.ToArray()
        y = other.ToArray()

        if len(x) != len(y):
            raise ValueError('Cannot compare %s with length %s to %s with length %s' % (type(self).__name__, len(x), type(other).__name__, len(y)))

        length = len(x)

        for i in range(length - 1, 0, -1):
            if x[i] > y[i]:
                return 1
            if x[i] < y[i]:
                return -1

        return 0

    def __lt__(self, other):
        return self.CompareTo(other) < 0

    def __gt__(self, other):
        return self.CompareTo(other) > 0

    def __le__(self, other):
        return self.CompareTo(other) <= 0

    def __ge__(self, other):
        return self.CompareTo(other) >= 0

def bin_hash160(string):
    """
    Get a hash of the provided message using the ripemd160 algorithm.
    Args:
        string (str): message to hash.
    Returns:
        str: hash as a double digit hex string.
    """
    intermed = hashlib.sha256(string).digest()
    return hashlib.new('ripemd160', intermed).hexdigest()

def Hash160(message):
        """
        Get a hash of the provided message using the ripemd160 algorithm.
        Args:
            message (str): message to hash.
        Returns:
            str: hash as a double digit hex string.
        """
        return bin_hash160(message)

class UInt160(UIntBase):
    def __init__(self, data=None):
        super(UInt160, self).__init__(num_bytes=20, data=data)

    @staticmethod
    def ParseString(value):
        """
        Parse the input str `value` into UInt160
        Raises:
            ValueError: if the input `value` length (after '0x' if present) != 40
        """
        if value[0:2] == '0x':
            value = value[2:]
        if not len(value) == 40:
            raise ValueError(f"Invalid UInt160 input: {len(value)} chars != 40 chars")
        reversed_data = bytearray.fromhex(value)
        reversed_data.reverse()
        return UInt160(data=reversed_data)

def ToScriptHash(data, unhex=True):
        """
        Get a script hash of the data.
        Args:
            data (bytes): data to hash.
            unhex (bool): (Default) True. Set to unhexlify the stream. Use when the bytes are not raw bytes; i.e. b'aabb'
        Returns:
            UInt160: script hash.
        """
        if len(data) > 1 and unhex:
            data = binascii.unhexlify(data)
        return UInt160(data=binascii.unhexlify(bytes(Hash160(data), encoding='utf-8')))
