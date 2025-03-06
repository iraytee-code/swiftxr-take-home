import ModelProvider from "@/context/model-provider";
import Navbar from "@/components/nav-bar";
import MainEditor from "@/components/main-editor/main-editor";

const Home = () => {
    return (
        <ModelProvider>
            <Navbar />
            <MainEditor />
        </ModelProvider>
    );
};

export default Home;
