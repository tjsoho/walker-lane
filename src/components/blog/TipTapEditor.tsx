"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { 
  Bold, 
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Type,
  Palette
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, active, children, tooltip }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-sm flex items-center gap-1 text-gray-700 hover:bg-gray-100 ${
        active ? 'bg-gray-200' : ''
      }`}
      title={tooltip}
    >
      {children}
    </button>
  );

  const HeadingSelect = () => (
    <select
      onChange={(e) => {
        const value = e.target.value;
        if (value === 'paragraph') {
          editor.chain().focus().setParagraph().run();
        } else {
          editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
        }
      }}
      className="h-8 px-2 border border-gray-200 rounded-sm text-gray-700 text-sm"
      value={
        editor.isActive('heading', { level: 1 })
          ? '1'
          : editor.isActive('heading', { level: 2 })
          ? '2'
          : editor.isActive('heading', { level: 3 })
          ? '3'
          : 'paragraph'
      }
    >
      <option value="paragraph">Paragraph</option>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
    </select>
  );

  return (
    <div className="border border-gray-200 rounded-sm">
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-2 bg-white">
        {/* Text Style Section */}
        <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
          <HeadingSelect />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            tooltip="Bold"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            tooltip="Italic"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            tooltip="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Alignment Section */}
        <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            tooltip="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            tooltip="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            tooltip="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            tooltip="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Color and Link Section */}
        <div className="flex items-center gap-2">
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-8 h-8 p-1 rounded-sm cursor-pointer"
            title="Text Color"
          />
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('Enter the URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            active={editor.isActive('link')}
            tooltip="Add Link"
          >
            <Link className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none text-gray-700"
      />
    </div>
  );
} 