import './app/globals.css';
import React, { useState, useRef, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table" // Shadcn Table
import { Input } from "./components/ui/input"     // Shadcn Input
import { Button } from "./components/ui/button"    // Shadcn Button
import {
    Trash2,
    ArrowUp,
    ArrowDown,
    Plus,
    XCircle,
    Eye,
    EyeOff
} from 'lucide-react';
//import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion';

interface Shortcut {
  id: string;
  functionName: string;
  shortcut: string;
}

const initialShortcuts: Shortcut[] = [
  { id: "1", functionName: "Copy", shortcut: "[Ctrl]+[C]" },
  { id: "2", functionName: "Paste", shortcut: "[Ctrl]+[V]" },
];

function App() {
  const [title, setTitle] = useState("Editing Shortcuts");
      const [shortcuts, setShortcuts] = useState<Shortcut[]>(initialShortcuts);
      const tableRef = useRef<HTMLTableElement>(null);
      const [editingId, setEditingId] = useState<string | null>(null);
      const editingInputRef = useRef<HTMLInputElement>(null);
      const [isPreview, setIsPreview] = useState(false);
      const [theme, setTheme] = useState('light');
  
  
      const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      };

      const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
      };
  
      const addRow = () => {
          const newShortcut: Shortcut = {
              id: crypto.randomUUID(),
              functionName: "",
              shortcut: "",
          };
          setShortcuts([...shortcuts, newShortcut]);
      };
  
      const updateShortcut = (id: string, field: keyof Shortcut, value: string) => {
          const updatedShortcuts = shortcuts.map((shortcut) =>
              shortcut.id === id ? { ...shortcut, [field]: value } : shortcut
          );
          setShortcuts(updatedShortcuts);
      };
  
      const deleteRow = (id: string) => {
          const updatedShortcuts = shortcuts.filter((shortcut) => shortcut.id !== id);
          setShortcuts(updatedShortcuts);
      };
  
      const moveRow = (id: string, direction: 'up' | 'down') => {
          const currentIndex = shortcuts.findIndex((item) => item.id === id);
          if (currentIndex === -1) return;
  
          const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
          if (newIndex < 0 || newIndex >= shortcuts.length) return;
  
          const updatedShortcuts = [...shortcuts];
          // Remove the item at the current index
          const [movedItem] = updatedShortcuts.splice(currentIndex, 1);
          // Insert the item at the new index
          updatedShortcuts.splice(newIndex, 0, movedItem);
          setShortcuts(updatedShortcuts);
      };
  
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
          if (e.key === 'Enter') {
              setEditingId(null);
              return;
          }
  
          let shortcutString = e.currentTarget.value;
          const key = e.key;
  
          if (key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Meta') {
              e.preventDefault();
              if (!shortcutString.includes(`[${key}]`)) {
                  shortcutString += `[${key}]`;
              }
          } else if (e.key === 'Escape') {
              e.preventDefault();
              setEditingId(null);
              updateShortcut(id, 'shortcut', '');
          }
          else {
              e.preventDefault();
              if (!shortcutString.includes(`[${key.toUpperCase()}]`)) {
                  shortcutString += `[${key.toUpperCase()}]`;
              }
          }
  
          updateShortcut(id, 'shortcut', shortcutString);
          e.currentTarget.value = shortcutString; // Update the input value
      };
  
      const handleFocus = (id: string) => {
          setEditingId(id);
      };
  
      const handleClear = (id: string) => {
          updateShortcut(id, 'shortcut', '');
          if (editingInputRef.current) {
              editingInputRef.current.value = '';
          }
      };
  
      useEffect(() => {
          if (editingInputRef.current) {
              editingInputRef.current.focus();
          }
      }, [editingId]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

      const generateHTML = () => {
      }

      const generateMarkdown = () => {
      }

  return (
    <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">Keyboard Shortcut Editor</h1>
    
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {isPreview ? title : "Table Title"}
                    </h2>
                    {!isPreview && (
                        <Input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="mb-4"
                            placeholder="Enter table title"
                        />
                    )}
                    <Table ref={tableRef} className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-full sm:w-1/3">Function</TableHead>
                                <TableHead className="w-full sm:w-1/3">Shortcut</TableHead>
                                {!isPreview && <TableHead className="w-full sm:w-1/3 text-right">Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {shortcuts.map((shortcut, index) => (
                                    <motion.tr
                                        key={shortcut.id}
                                        layout
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            backgroundColor: 'transparent'
                                        }}
                                        exit={{ opacity: 0, x: -20 }}
                                        whileHover={{
                                            backgroundColor: '#f7fafc'
                                        }}
                                        transition={{ duration: 0.2 }}
    
                                    >
                                        <TableCell className="block sm:table-cell">
                                            <Input
                                                value={shortcut.functionName}
                                                onChange={(e) =>
                                                    updateShortcut(shortcut.id, "functionName", e.target.value)
                                                }
                                                className="w-full"
                                            />
                                        </TableCell>
                                        <TableCell className="block sm:table-cell">
                                            {isPreview ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {shortcut.shortcut.split('+').map((key, keyIndex) => {
                                                        const trimmedKey = key.replace(/\[|\]/g, '');
                                                        return (
                                                            <span key={keyIndex} className="kbd-button">
                                                                {trimmedKey}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <Input
                                                        ref={editingId === shortcut.id ? editingInputRef : null}
                                                        value={shortcut.shortcut}
                                                        onChange={(e) =>
                                                            updateShortcut(shortcut.id, "shortcut", e.target.value)
                                                        }
                                                        onKeyDown={(e) => handleKeyDown(e, shortcut.id)}
                                                        onFocus={() => handleFocus(shortcut.id)}
                                                        className="w-full pr-8"
                                                    />
                                                    {shortcut.shortcut && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleClear(shortcut.id)}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2"
                                                            title="Clear Shortcut"
                                                        >
                                                            <XCircle className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                        {!isPreview && (
                                            <TableCell className="text-right block sm:table-cell">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => moveRow(shortcut.id, 'up')}
                                                        title="Move Up"
                                                    >
                                                        <ArrowUp className="h-5 w-5 text-gray-400" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => moveRow(shortcut.id, 'down')}
                                                        title="Move Down"
                                                    >
                                                        <ArrowDown className="h-5 w-5 text-gray-400" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => deleteRow(shortcut.id)}
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        )}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                    {!isPreview && (
                        <Button onClick={addRow} className="mt-4">
                            <Plus className="mr-2 h-4 w-4" /> Add Row
                        </Button>
                    )}
                </div>
    
                <div className="text-center flex gap-4 justify-center">
                    <Button onClick={() => setIsPreview(!isPreview)}>
                        {isPreview ? <><EyeOff className="mr-2 h-4 w-4" /> Edit</> : <><Eye className="mr-2 h-4 w-4" /> Preview</>}
                    </Button>
                    <Button onClick={toggleTheme}>
                        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    </Button>
                    <Button className="mr-2" onClick={generateHTML}>Export to HTML</Button>
                    <Button variant="secondary" onClick={generateMarkdown}>Export to Markdown</Button>
                </div>
            </div>
  );
}

export default App;
