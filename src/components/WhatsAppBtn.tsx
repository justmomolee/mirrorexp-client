import { IoLogoWhatsapp } from "react-icons/io"

export default function WhatsAppBtn() {
  return (
    <div className="fixed left-5 bottom-5 z-999999">
      <a href='http://wa.me/13652638468'>
        <IoLogoWhatsapp className="text-4xl text-green-400"/>
      </a>
    </div>
  )
}
