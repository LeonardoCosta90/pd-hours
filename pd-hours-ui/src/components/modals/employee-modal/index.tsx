import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api/api';

export default function CreateEmployeeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [hours, setHours] = useState(Number())
  const [id, setId] = useState(Number())
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast();

  useEffect(() => {
  }, []);

  const handleName = (value: React.SetStateAction<string>) => {
    setName(value)
  }

  const handleHours = (value: React.SetStateAction<number>) => {
    setHours(value)
  }

  const handleId = (value: React.SetStateAction<number>) => {
    setId(value)
  }

  const createEmployee = async () => {
    try {
      await api.post('/employees', {
        "name": name,
        "estimatedHours": hours,
        "squadId": id
      })
      window.location.reload();
    } catch (err) {
      toast({
        description: `Não foi possível cadastrar, o usuário ja existe ou squad não encontrado!`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Button  w="182px" h="48px" color="white" background="#4263EB" onClick={onOpen} ml="5" mt="5">Criar usuário</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Usuário</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"#ACB5BD"} fontSize={"12px"}>NOME DO USUÁRIO</FormLabel>
              <Input 
                color={"#DDE2E5"}
                fontSize={"21px"}
                ref={initialRef}
                placeholder='Digite o nome do usuário'
                onChange={(e) => handleName(e.target.value)}
                />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"#ACB5BD"} fontSize={"12px"}>Horas estimadas de trabalho</FormLabel>
              <Input 
                type="number"
                min="1"
                max="12"
                color={"#DDE2E5"}
                fontSize={"21px"}
                ref={initialRef}
                placeholder='Digite a quantidade de horas'
                onChange={(e) => handleHours(Number(e.target.value))}
                />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"#ACB5BD"} fontSize={"12px"}>Squad</FormLabel>
              <Input 
                color={"#DDE2E5"}
                type="number"
                fontSize={"21px"}
                placeholder='Digite o Id da squad'
                onChange={(e) => handleId(Number(e.target.value))} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button type="submit" form="new-squad" background="#4263EB" color='white' mr={3} onClick={(event) => {  createEmployee(); onClose();}} >
              Criar usuário
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}