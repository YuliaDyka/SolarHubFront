import { useEffect, useState } from 'react'
import Select, { type MenuPlacement, type StylesConfig, type SingleValue } from 'react-select'

type OptionType = {
  value: any
  label: string
}

interface SelectProps {
  options: OptionType[]
  className?: string
  menuPlacement?: MenuPlacement
  defaultInputValue?: any
  value?: any
  onChange?: (_: OptionType) => void
}

const customStyles: StylesConfig<OptionType> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles) => {
    return {
      ...styles,
      positionAnchor: 'auto',
    }
  },
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({ ...styles }),
}

const CustomSelect = ({
  options,
  className,
  menuPlacement,
  defaultInputValue,
  value,
  onChange,
  ...params
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<OptionType>(defaultInputValue ?? options[0])

  useEffect(() => {
    setSelectedValue(options.find((v) => v.value === value) ?? options[0])
  }, [value])

  const handleChange = (newValue: SingleValue<OptionType>) => {
    setSelectedValue(newValue ?? options[0])
    if (onChange) {
      onChange(newValue ?? options[0])
    }
  }

  return (
    <Select<OptionType>
      options={options}
      styles={customStyles}
      menuPlacement={menuPlacement}
      defaultInputValue={defaultInputValue}
      value={selectedValue}
      onChange={handleChange}
      {...params}
    />
  )
}

export default CustomSelect
