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
  Textarea,
  Toast,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api/api';

export default function CreateReportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState(Number())
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState(Number())
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null) 

  useEffect(() => {
  }, []);

  const handleDescription = (value: React.SetStateAction<string>) => {
    setDescription(value)
  }

  const handleHours = (value: React.SetStateAction<number>) => {
    setHours(value)
  }

  const handleId = (value: React.SetStateAction<number>) => {
    setId(value)
  }

  const createReport= async () => {
    try {
      console.log({
        "description": description,
        "spentHours": hours,
        "employeeId": id
      })
      await api.post('/reports', {
        "description": description,
        "spentHours": hours,
        "employeeId": id
      })
      window.location.reload();
    } catch (err) {
      Toast({
        description: `Não foi possível cadastrar o report!`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Button  w="182px" h="48px" color="white" background="#4263EB" onClick={onOpen}>Lançar Horas</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar lançamento</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"#ACB5BD"} fontSize={"12px"}>ID do usuário</FormLabel>
              <Input 
                color={"#DDE2E5"}
                type="number"
                min="1"
                fontSize={"21px"}
                ref={initialRef}
                placeholder='Digite o ID do funcionário'
                onChange={(e) => handleId(Number(e.target.value))}
                />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"#ACB5BD"} fontSize={"12px"}>HORAS GASTAS</FormLabel>
              <Input 
                type="number" 
                color={"#DDE2E5"} 
                fontSize={"21px"} 
                ref={initialRef} 
                placeholder='Digite a quantidade de horas'
                onChange={(e) => handleHours(Number(e.target.value))} 
                />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"#ACB5BD"} fontSize={"12px"}>DESCRIÇÃO</FormLabel>
              <Textarea 
                color={"#DDE2E5"} 
                fontSize={"21px"} 
                placeholder='Exemplo de texto de descrição
                da tarefa executada.'
                onChange={(e) => handleDescription(e.target.value)} 
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button type="submit" form="new-squad" background="#4263EB" color='white' mr={3} onClick={(event) => {  createReport(); onClose();}} >
          Lançar horas
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}