import NavItem from "./NavItem";

export default function Nav({ navigation }) {

  
  // let ref = useRef(); 
  return (
    <ul className="navbar__nav">
      {
        navigation.map((page, index) => {
          return <NavItem page={page} key={index} />
        })
      }
    </ul>
  )
}

// <NavItem key={page.name} page={page} />