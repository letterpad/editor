import React from "react";
// import FileExplorerModal from "../../../../modals/FileExplorerModal";
import { insertInlineImage, insertImage } from "./ImageUtils";
import Button from "../../components/Button";
import { hasBlock } from "../../helper/strategy";
import { runInNewContext } from "vm";
// import { uploadFile } from "../../../../../util";

const ImageButton = ({ editor, next }) => {
    if (!editor) return <span />;

    return (
        <Button
            isActive={false}
            icon="image"
            onMouseDown={e => {
                e.preventDefault();

                const src = window.prompt("Enter the URL of the image:");
                if (!src) return next();
                // const isActive = hasBlock(editor.value, "img");
                insertImage(editor, src, isActive);
            }}
        />
    );
};

// class ImageButton extends React.Component {
//     imageInputRef = React.createRef();

//     state = {
//         fileExplorerOpen: false
//     };

//     insertMedia = src => {
//         this.props.onChange(
//             insertInlineImage({ change: this.props.value.change(), src })
//         );

//         this.toggleFileExplorer();
//     };

//     toggleFileExplorer = () => {
//         this.setState({ fileExplorerOpen: !this.state.fileExplorerOpen });
//     };

//     uploadImage = async files => {
//         // const uploadedFiles = await uploadFile({ files, type: "post_image" });
//         // let change = this.props.value.change();
//         // uploadedFiles.forEach(src => {
//         //   this.props.onChange(insertInlineImage({ change, src }));
//         // });
//     };

//     render() {
//         if (!editor) return <span />;
//         const type = "img";
//         const { editor } = this.props;
//         return (
//             <React.Fragment>
//                 <Button
//                     isActive={hasBlock(editor.value, type)}
//                     icon="image"
//                     onMouseDown={this.toggleFileExplorer}
//                 />
//                 <input
//                     ref={this.imageInputRef}
//                     className="hide post-image"
//                     type="file"
//                     multiple
//                     onChange={input => this.uploadImage(input.target.files)}
//                 />
//             </React.Fragment>
//         );
//     }
// }
export default ImageButton;

// {this.state.fileExplorerOpen && (
//     <FileExplorerModal
//         isOpen={this.state.fileExplorerOpen}
//         onClose={this.toggleFileExplorer}
//         onMediaSelect={this.insertMedia}
//         addNewMedia={() => {
//             this.imageInputRef.current.click();
//             this.toggleFileExplorer();
//         }}
//     />
// )}
