import { EditorProvider, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import PropTypes from "prop-types";

RichText.propTypes = {
  content: PropTypes.string,
  length: PropTypes.number,
  lightText: PropTypes.bool,
};

const extensions = [
  StarterKit,
  TextStyle,
  Color.configure({ types: [TextStyle.name] }),
];

export default function RichText({ content, length, lightText }) {
  const editor = useEditor({
    extensions,
    content: content.substring(0, length) + "...", // Truncate content if necessary
    editable: false,
  });

  return (
    <EditorProvider editor={editor} extensions={extensions}>
      <div className={lightText ? "text-gray-300" : ""}>
        <EditorContent editor={editor} />
      </div>
    </EditorProvider>
  );
}
