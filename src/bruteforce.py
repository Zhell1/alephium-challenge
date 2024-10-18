import struct
import pyblake2


start_from = 51144000000  # Adjust start  ///49378216050; 
end_at     = 98765423100      # Adjust end

# Target hash
target_hash = '0c1f9f51c90b70c1fb747c2860150d1187d248f508279cf3a24597039ab863d5'

# Convert the hex string to bytes for faster comparisons
target_hash_bytes = bytes.fromhex(target_hash)

"""
# Compute the Blake2b-256 hash
def compute_blake2b_hash(u256):
    # Pack the 64-bit integer into an 8-byte big-endian format
    byte_vec = struct.pack('>Q', u256)
    # Use hashlib's blake2b function to compute the hash
    blake_hash = hashlib.blake2b(byte_vec, digest_size=32).hexdigest()
    return blake_hash
"""

# Function to compute Blake2b hash using pyblake2
def compute_blake2b_hash(u256):
    byte_vec = struct.pack('>Q', u256)  # Pack the 64-bit integer as big-endian
    # Create a new Blake2b hash object for each hash computation
    blake_hash = pyblake2.blake2b(byte_vec, digest_size=32).digest()
    return u256 if blake_hash == target_hash_bytes else None

# Brute-force search function
def brute_force_search(start, end):
    for u256 in range(start, end + 1):
        result = compute_blake2b_hash(u256)
        if result is not None:
            print(f"Found matching U256 value: {result}")
            return result
        # Optional: Add progress logging every 1,000,000 iterations
        if u256 % 1000000 == 0:
            perc = (u256/end_at*100-50)*2
            perc = round(perc, 2)
            print(f"Checked up to U256 value: {u256}  |  {perc}%")
    
    print("No matching U256 value found.")
    return None

# Execute the brute-force search
if __name__ == "__main__":
    brute_force_search(start_from, end_at)