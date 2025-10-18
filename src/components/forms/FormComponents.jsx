import PropTypes from 'prop-types'
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'

const { Option } = Select

/**
 * Formulario de búsqueda reutilizable
 */
export const SearchForm = ({
  onSearch,
  placeholder = 'Buscar...',
  loading = false,
  className = '',
}) => {
  const [form] = Form.useForm()

  const handleSubmit = values => {
    onSearch(values.search)
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className={`search-form ${className}`}
      layout="inline"
    >
      <Form.Item name="search" className="flex-1">
        <Input
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          size="large"
          icon={<SearchOutlined />}
        >
          Buscar
        </Button>
      </Form.Item>
    </Form>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  className: PropTypes.string,
}

/**
 * Filtros avanzados reutilizables
 */
export const AdvancedFilters = ({
  filters = [],
  onApply,
  onClear,
  loading = false,
  className = '',
}) => {
  const [form] = Form.useForm()

  const handleApply = () => {
    const values = form.getFieldsValue()
    onApply(values)
  }

  const handleClear = () => {
    form.resetFields()
    onClear()
  }

  return (
    <div className={`advanced-filters ${className}`}>
      <Form form={form} layout="vertical" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filters.map((filter, index) => (
            <Form.Item key={index} label={filter.label} name={filter.name}>
              {filter.type === 'select' && (
                <Select placeholder={filter.placeholder}>
                  {filter.options?.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              )}
              {filter.type === 'input' && (
                <Input placeholder={filter.placeholder} />
              )}
              {filter.type === 'number' && (
                <InputNumber
                  placeholder={filter.placeholder}
                  min={filter.min}
                  max={filter.max}
                  className="w-full"
                />
              )}
              {filter.type === 'date' && (
                <DatePicker
                  placeholder={filter.placeholder}
                  className="w-full"
                />
              )}
            </Form.Item>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <Button onClick={handleClear}>Limpiar</Button>
          <Button
            type="primary"
            onClick={handleApply}
            loading={loading}
            icon={<FilterOutlined />}
          >
            Aplicar Filtros
          </Button>
        </div>
      </Form>
    </div>
  )
}

AdvancedFilters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['select', 'input', 'number', 'date']).isRequired,
      placeholder: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
      min: PropTypes.number,
      max: PropTypes.number,
    })
  ),
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
}

/**
 * Formulario de contacto básico
 */
export const ContactForm = ({ onSubmit, loading = false, className = '' }) => {
  const [form] = Form.useForm()

  const handleSubmit = values => {
    onSubmit(values)
    form.resetFields()
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className={`contact-form ${className}`}
      layout="vertical"
    >
      <Form.Item
        label="Nombre"
        name="name"
        rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
      >
        <Input placeholder="Tu nombre completo" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor ingresa tu email' },
          { type: 'email', message: 'Ingresa un email válido' },
        ]}
      >
        <Input placeholder="tu@email.com" />
      </Form.Item>

      <Form.Item
        label="Asunto"
        name="subject"
        rules={[{ required: true, message: 'Por favor ingresa el asunto' }]}
      >
        <Input placeholder="Asunto del mensaje" />
      </Form.Item>

      <Form.Item
        label="Mensaje"
        name="message"
        rules={[{ required: true, message: 'Por favor ingresa tu mensaje' }]}
      >
        <Input.TextArea rows={4} placeholder="Escribe tu mensaje aquí..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Enviar Mensaje
        </Button>
      </Form.Item>
    </Form>
  )
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
}

export default SearchForm
