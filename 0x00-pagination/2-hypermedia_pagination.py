#!/usr/bin/env python3
"""
pagination
"""
import csv
import math
from typing import Tuple, List, Dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    finds the start and end page_size

    Args:
        page (int): the referenced page
        page_size (int):  size of each page
    Return:
        Tuple containin the start and end index
    """
    last_index = page * page_size
    first_index = last_index - page_size
    return (first_index, last_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
            returns required page from client
        """
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0
        self.dataset()
        start, end = index_range(page, page_size)
        return self.__dataset[start: end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
            returns required page with hypermedia
        """
        from math import ceil

        data = self.get_page(page, page_size)
        total_pages = ceil(len(self.__dataset) / page_size)
        next_page = page + 1
        if next_page > total_pages:
            next_page = None
        prev_page = page - 1
        if prev_page <= 0:
            prev_page = None
        return {
            "page": page,
            "page_size": page_size,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
