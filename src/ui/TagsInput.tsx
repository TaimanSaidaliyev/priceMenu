import React, { useState, useRef, useEffect } from 'react';


export interface TagsInputProps {
  name?: string;
  placeHolder?: string;
  value?: number[] | null; // исходное значение – массив id выбранных тегов
  onChange?: (tagIds: number[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  maxTagsCount?: number;
  availableTags: ITags[]; // явно указываем тип
  initialTags?: ITags[]; // явно указываем, что это массив ID
}

const TagsInput: React.FC<TagsInputProps> = ({
  name,
  placeHolder,
  value,
  onChange,
  onBlur,
  disabled,
  maxTagsCount,
  availableTags,
  initialTags = [], // значение по умолчанию
}) => {
  // Храним выбранные теги в виде объектов из availableTags
  const [selectedTags, setSelectedTags] = useState<ITags[]>([]);

  // Значение поля ввода всегда строка
  const [inputValue, setInputValue] = useState('');
  // Подсказки, отфильтрованные по введённому тексту
  const [suggestions, setSuggestions] = useState<ITags[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [forLoad, setForLoad] = useState(false);
  // Фильтрация подсказок при изменении текста ввода или выбранных тегов
  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = availableTags.filter(
      (tag: ITags) =>
        tag.title.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.some((selected) => selected.id === tag.id)
    );
    setSuggestions(filtered);
  }, [inputValue, selectedTags, availableTags]);

  // При изменении выбранных тегов вызываем onChange и передаём массив id
  useEffect(() => {
    if (onChange) {
		//@ts-ignore
      onChange(selectedTags.map((tag) => tag.id));
    }
	console.log(selectedTags)
  }, [selectedTags, onChange]);

  const inputRef = useRef<HTMLInputElement>(null);
  // Для закрытия списка подсказок при клике вне компонента
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
	setSelectedTags(initialTags);
	const handleClickOutside = (event: MouseEvent) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
			setShowSuggestions(false);
		}
	};
	document.addEventListener('mousedown', handleClickOutside);
	return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(()=>{
	setForLoad(true);
	console.log(initialTags)
  },[initialTags])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      addTag(suggestions[0]);
    }
    if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
		//@ts-ignore
      	removeTag(selectedTags[selectedTags.length - 1].id);
    }
  };

  const addTag = (tag: ITags) => {
    if (maxTagsCount !== undefined && selectedTags.length >= maxTagsCount) return;
    setSelectedTags((prev) => [...prev, tag]);
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeTag = (tagId: number) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const handleSuggestionClick = (tag: ITags) => {
    addTag(tag);
  };

  const placeholderText =
    maxTagsCount !== undefined && selectedTags.length >= maxTagsCount
      ? ''
      : placeHolder;

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="flex flex-wrap items-center gap-2 rounded-md border p-2 px-3 py-2 text-sm
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        {selectedTags.map((tag) => (
          <span
			//@ts-ignore
            key={tag.id}
            className="inline-flex items-center rounded bg-neutral-300 px-2 py-1"
          >
            <span>{tag.title}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
				  //@ts-ignore
                  removeTag(tag.id);
                }}
                aria-label={`remove ${tag.title}`}
                className="ml-2 cursor-pointer rounded-full border-0 bg-transparent p-0 hover:text-neutral-400 hover:transition-colors"
              >
                ✕
              </button>
            )}
          </span>
        ))}

        <input
          ref={inputRef}
          className="h-6 flex-grow bg-transparent text-neutral-800 placeholder:text-neutral-800 
                     focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring 
                     focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          name={name}
          placeholder={placeholderText}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          disabled={disabled}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
          <ul className="py-1">
            {suggestions.map((sugg) => (
              <li
			  	//@ts-ignore
                key={sugg.id}
                onClick={() => handleSuggestionClick(sugg)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {sugg.title}
              </li>
            ))}
          </ul>
        </div>
      )}
	  {forLoad}
    </div>
  );
};

export { TagsInput };