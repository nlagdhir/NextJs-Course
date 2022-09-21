const UserIdPage = (props) => {
    console.log(props);
    return <h1>{props.id}</h1>
}

export default UserIdPage;

export const getServerSideProps = async (content) => {
    const {params} = content;

    const userId = params.uid;
    

    console.log(userId);

    return {
        props : {
            id : `userId - ${userId}`,
        }
    }
}