const UserProfile = (props) => {
    return <h1>{props.username}</h1>
}

export default UserProfile;

export const getServerSideProps = async (context) => {

    const { params, req, res } = context;

    return {
        props : {
            username : 'Max'
        }
    }
}