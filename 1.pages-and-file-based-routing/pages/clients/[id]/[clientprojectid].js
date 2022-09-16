import { useRouter } from "next/router";

const SelectedClientProjectPage = () => {

    const router = useRouter();

    console.log(router.query);

    return <div>
        <h1>The Project page for a specific project for a Selected Client</h1>
    </div>
}

export default SelectedClientProjectPage;
