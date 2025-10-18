import React from 'react'
import { Button, Tooltip } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

/**
 * Botón flotante de WhatsApp
 * Se posiciona en la esquina inferior derecha de la pantalla
 * Permite contactar por WhatsApp con un mensaje predefinido
 */
const WhatsAppFloatButton = () => {
  const phoneNumber = '+1234567890' // Cambiar por el número real de WhatsApp
  const message = '¡Hola! Me gustaría información sobre sus servicios de streaming.'

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-16 z-50">
      <Tooltip
        title="¡Contáctanos por WhatsApp!"
        placement="left"
        color="#25D366"
      >
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<WhatsAppOutlined />}
          onClick={handleWhatsAppClick}
          className="whatsapp-float-button shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: '#25D366',
            borderColor: '#25D366',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </Tooltip>

      <style jsx>{`
        /* Modo oscuro para WhatsApp */
        :global(.dark) .whatsapp-float-button {
          background-color: #1da851 !important;
          border-color: #1da851 !important;
        }

        :global(.dark) .whatsapp-float-button:hover {
          background-color: #25D366 !important;
          border-color: #25D366 !important;
        }
      `}</style>
    </div>
  )
}

export default WhatsAppFloatButton
