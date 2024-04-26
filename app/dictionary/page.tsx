'use client'
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function Dictionary() {
  const [words, setWords] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('api/word');
      const jsonData = await response.json();
      setWords(jsonData?.data ?? []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('vao day nhe');
    // fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  }

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">
      <p>chào bạn</p>
      <p>work {words.length}</p>
      <p><button onClick={handleClick}>load data</button></p>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            open
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </main>
  );
}
