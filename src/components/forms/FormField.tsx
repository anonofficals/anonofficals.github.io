import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormInput: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  className
}) => {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-gray-700 border-gray-600 text-white ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const FormTextarea: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  rows = 4,
  className
}) => {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <Textarea
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-gray-700 border-gray-600 text-white ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        rows={rows}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const FormSelect: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
  placeholder,
  className
}) => {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${error ? 'border-red-500' : ''}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};
