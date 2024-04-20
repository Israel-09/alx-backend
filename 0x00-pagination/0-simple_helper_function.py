#!/usr/bin/python3
"""
pagination implementation
"""
from typing import Tuple


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
