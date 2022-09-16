import { useRouter } from "next/router";

const ClientProjectsPage = () => {
  const router = useRouter();
  
  const {id} = router.query;
  const loadProjectHandler = () => {
    //router.push('/clients/joseph/projecta');
    
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: id, clientprojectid: "projecta" },
    });
  };

  return (
    <div>
      <h1>Project of the given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
