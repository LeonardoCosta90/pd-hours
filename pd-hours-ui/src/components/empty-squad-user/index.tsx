import {
   Box,
   Button,
   Flex,
   Image,
   Input,
   Text,
} from '@chakra-ui/react';
import CreateEmployeeModal from '../modals/employee-modal';

 export default function EmptySquadUser() {
   return (
    <Flex display={"flex"} flexDirection={"column"}  justifyContent={"space-between"} >
      <Box bg="white" p="4" w="150%" h="411" display={"flex"} flexDirection={"column"}  justifyContent={"space-evenly"} mt="10" alignItems="center" borderRadius='md'>
      <Text size="28px" fontWeight={"400"}>Horas por membro</Text>
      <Image src='/sad-face.svg' height="128px" width="128px"alt='sad-face'/>
      <Text size="16px" color="#ACB5BD">Nenhum usuário cadastrado nesta squad. Crie um usuário para começar.</Text>
      <CreateEmployeeModal/>
      </Box>
    </Flex>  
   );
 }