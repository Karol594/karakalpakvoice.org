import React from 'react';
import { UserPlus, Mail, MessageCircle } from 'lucide-react';

function JoinUs() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-white p-4 rounded-full">
            <UserPlus size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold">Бизге қосылың!</h1>
        </div>
        <p className="text-xl mb-8 leading-relaxed">
          Қарақалпақстан халқының даўысын жеткизиўге өз үлесиңизди қосыңыз. Биз бенен бирге болың!
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Mail size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Email арқалы</h3>
            <p className="mb-4">Бизге хат жазың</p>
            <a 
              href="mailto:info@karakalpakvoice.org"
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Хат жазыў
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <MessageCircle size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Telegram арқалы</h3>
            <p className="mb-4">Тиккелей байланысың</p>
            <a 
              href="https://t.me/kkvoice_org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Жазысыў
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
