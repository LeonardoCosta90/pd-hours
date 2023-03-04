import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, {  useState } from 'react';
import { api } from '../../../services/api/api';

export default function CreateSquadModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [squad, setSquad] = useState('')
  const toast = useToast();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  
  const handleChange = (value: React.SetStateAction<string>) => {
    setSquad(value)
  }

  const createSquad = async () => {
    try {
      await api.post('/squads', {
        "name": squad
      })
      window.location.reload();
    } catch (err) {
      toast({
        description: `Ja existe um squad com o nome de ${squad}!`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
    <Button  w="182px" h="48px" color="white" background="#4263EB" onClick={onOpen}>Criar squad</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar squad</ModalHeader>
          <ModalBody pb={6}>      
            <FormControl>
              <FormLabel color={"#ACB5BD"} fontSize={"12px"}>NOME DA SQUAD</FormLabel>
              <Input 
                color={"#DDE2E5"}
                fontSize={"21px"}
                type="string"
                placeholder='Digite o nome da squad'
                onChange={(e) => handleChange(e.target.value)} 
                />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" form="new-squad" background="#4263EB" color='white' mr={3} onClick={(event) => {  createSquad(); onClose()}} >
              Criar squad
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
      
  )
}