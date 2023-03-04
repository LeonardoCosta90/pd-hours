import {
   Box,
   Button,
   Flex,
   Image,
   Input,
   Stack,
   Text,
} from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import CreateEmployeeModal from '../modals/employee-modal';

 export default function EmptySquadUser() {
  const [startDate, setStartDate] = useState(moment(new Date()).format('yyyy-MM-DD'))
  const [endDate, setEndDate] = useState(moment(new Date()).format('yyyy-MM-DD'))
   return (
    <Flex display={"flex"} flexDirection={"column"}  justifyContent={"space-between"} >
      <Box bg="white" p="4" w="150%" h="411" display={"flex"} flexDirection={"column"}  justifyContent={"space-evenly"} mt="10" alignItems="center" borderRadius='md'>
      <Text fontSize="28px" fontWeight={"400"}>Horas por membro</Text>
      <Stack direction='row' alignItems="center" mt="5">
        <Input type="date" w="190px" value={startDate} disabled={true}></Input>
        <Input type="date" w="190px" value={endDate} disabled={true}></Input>
        <Button type="submit" form="new-squad" background="#4263EB" color='white' mr={3} isActive >
        Lançar horas
        </Button>
      </Stack>       
      <Image src='/sad-face.svg' height="128px" width="128px"alt='sad-face'mt="5"/>
      <Text size="16px" color="#ACB5BD" mt="5">Nenhum usuário cadastrado nesta squad. Crie um usuário para começar.</Text>
      <CreateEmployeeModal/>
      </Box>
    </Flex>  
   );
 }