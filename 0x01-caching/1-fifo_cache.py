#!/usr/bin/env python3
"""
FIFO cache module
"""
from base_caching import BaseCaching
from collections import deque


class FIFOCache(BaseCaching):
    """
    FIFO cache implemenation
    """
    def __init__(self):
        """class constructor"""
        super().__init__()
        self.keys_map = deque([])

    def put(self, key, item):
        """
        add item to the FIFO cache
        """
        if key is None or item is None:
            return
        if len(self.keys_map) < self.MAX_ITEMS:
            self.keys_map.append(key)
            self.cache_data[key] = item
        else:
            if key in self.cache_data:
                self.cache_data[key] = item
                return
            first_key = self.keys_map.popleft()
            self.keys_map.append(key)
            print("DISCARD: {}".format(first_key))
            self.cache_data.pop(first_key)
            self.cache_data[key] = item

        def get(self, key):
            """
            return the key value
            """
            if key is None or key not in self.cache_data:
                return None
            return self.cache_data.get(key)
