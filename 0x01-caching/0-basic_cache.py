#!/usr/bin/env python3
"""
base cache module
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    implement the put and get methods
    """
    def put(self, key, item):
        """
        add an item to the cache
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        retrieve the value of a key
        """
        if key is not None:
            return self.cache_data.get(key)
