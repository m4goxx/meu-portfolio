'use server';

export async function submitContactForm(formData: FormData) {
  const botField = formData.get('_honeypot');
  if (botField) {
    return { success: true, message: 'Bot detectado' };
  }

  const sanitize = (str: any) => String(str).replace(/<[^>]*>?/gm, '').trim();

  const data = {
    "Nome do Cliente": sanitize(formData.get('name')),
    "E-mail de Contato": sanitize(formData.get('email')),
    "ID do Discord": sanitize(formData.get('discord')),
    "Serviço Desejado": sanitize(formData.get('service')),
    "Descrição do Projeto": sanitize(formData.get('message')),
    "_subject": `🚀 Novo Projeto: ${sanitize(formData.get('name'))} via Portfólio`,
  };

  try {
    const formId = process.env.FORMSPREE_ID || 'mkoqlbab';
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return { success: true };
    } else {
      const result = await response.json();
      console.error('Erro Formspree:', result);
      return { success: false, error: 'Erro no servidor de e-mail' };
    }
  } catch (error) {
    console.error('Erro de rede:', error);
    return { success: false, error: 'Erro de conexão' };
  }
}
