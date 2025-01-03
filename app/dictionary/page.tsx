'use client';
import React, { useEffect, useState } from 'react';
import WordComp from '@/components/Word';
import WordLearn from '@/components/WordLearn';
import { Button, useDisclosure } from '@nextui-org/react';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';

export default function Page() {
    const [words, setWords] = useState<any>([]);
    const [wordLearns, setWordLearns] = useState<any>([]);
    const [wordDone, setWordDone] = useState(0);
    const [wordDoing, setWordDoing] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenLearn, onOpen: onOpenLearn, onOpenChange: onOpenChangeLearn } = useDisclosure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('api/words');
                const jsonData = await response.json();
                setWords(jsonData?.data ?? []);

                const tdone = (jsonData?.data ?? []).filter((w: any) => w.WN104 === 1).length || 0;
                setWordDone(tdone);
                setWordDoing(jsonData?.data.length - tdone);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const actionLearnNew = () => {
        setWordLearns(words.filter((w: any) => w.WN104 !== 1))
        onOpenLearn();
    };

    const actionLearnDone = () => {
        setWordLearns(words.filter((w: any) => w.WN104 === 1))
        onOpenLearn();
    };

    return (
        <main className="flex min-h-screen flex-col p-4 bg-background gap-3">
            <div className='flex justify-between items-center'>

            </div>
            <div className="div-box bg-white p-2 rounded-small">
                <h3 className="font-semibold">Thống kê</h3>
                <p>Tổng: {words.length}</p>
                <p>Hoàn thành: {wordDone}</p>
                <p>Chưa hoàn thành: {wordDoing}</p>
                <Button color="primary" onPress={onOpen}>
                    Danh sách
                </Button>
            </div>

            <div className="div-box bg-white p-2 rounded-small">
                <h3 className="font-semibold">Học</h3>
                <p>Card</p>
                <Button color="primary" onPress={actionLearnNew}>
                    Từ mới
                </Button>
                <Button color="primary" onPress={actionLearnDone}>
                    Hoan thanh
                </Button>
            </div>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose: any) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Words</DrawerHeader>
                            <DrawerBody>
                                <ul className="flex flex-col gap-2">
                                    {words.map((w: any) => {
                                        return <WordComp data={w} />;
                                    })}
                                </ul>
                            </DrawerBody>
                            <DrawerFooter></DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>

            <Modal isOpen={isOpenLearn} onOpenChange={onOpenChangeLearn}>
                <ModalContent className='h-full w-full'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                {isOpenLearn && <WordLearn data={wordLearns}/>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
}
