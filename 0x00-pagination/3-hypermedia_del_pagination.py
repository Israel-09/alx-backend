#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        paginate based on resource index
        """
        assert type(index) is int and index >= 0 and index < 1001
        assert type(page_size) is int and page_size > 0

        end = index + page_size
        indexed_data = self.indexed_dataset()
        dataset = []
        next_index = index
        for i in range(index, end):
            data = None
            while (data is None):
                data = indexed_data.get(next_index)
                next_index += 1
            dataset.append(data)
        return {
            "index": index,
            "next_index": next_index,
            "data": dataset,
            "page_size": page_size
        }
