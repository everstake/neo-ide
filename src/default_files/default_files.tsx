import domainContentCs from "./domain.cs";
import domainContentPy from "./domain.py";

const folders = [
    {
        key: "examples_python/",
        name: "examples_python",
        size: 0,
        file: false,
        saved: true,
        compiled: true,
        deployed: false,
        savedContent: "",
        currentContent: "",
        binary: "",
    }, {
        key: "examples_csharp/",
        name: "examples_csharp",
        size: 0,
        file: false,
        saved: true,
        compiled: true,
        deployed: false,
        savedContent: "",
        currentContent: "",
        binary: "",
    },
];

const files = [
    {
        key: "examples_python/domain.py",
        size: 1.5 * 245 * 1024,
        file: true,
        saved: true,
        compiled: false,
        deployed: false,
        savedContent: domainContentPy,
        currentContent: domainContentPy,
        binary: "",
    }, {
        key: "examples_csharp/domain.cs",
        size: 1.5 * 245 * 1024,
        file: true,
        saved: true,
        compiled: false,
        deployed: false,
        savedContent: domainContentCs,
        currentContent: domainContentCs,
        binary: "",
    },
];

export default {folders, files};
