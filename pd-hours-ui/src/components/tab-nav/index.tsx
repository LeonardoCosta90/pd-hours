import { Link, Tab, TabList, Tabs} from '@chakra-ui/react';

export default function TabNav() {  
  return (
    <Tabs>
        <TabList>
          <Link href="/">
            <Tab>Squads</Tab>
          </Link>
          
          <Link href="/employee">
          <Tab >Usuários</Tab>
          </Link>
        </TabList>
    </Tabs>
  )
}

