from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os

notifications_bp = Blueprint("notifications", __name__)

# Configurações de email (em produção, usar variáveis de ambiente)
SMTP_SERVER = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
EMAIL_USER = os.environ.get("EMAIL_USER", "constructpro@example.com")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "your_app_password")

def get_email_template(notification_type, data, language="pt"):
    """Gera template de email baseado no tipo de notificação e idioma"""

    templates = {
        "pt": {
            "non_conformity": {
                "subject": f"Nova Não Conformidade: {data.get('title', '')}",
                "body": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">
                            🚨 Nova Não Conformidade Reportada
                        </h2>
                        
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1976d2;">{data.get('title', '')}</h3>
                            <p><strong>Descrição:</strong> {data.get('description', '')}</p>
                        </div>
                        
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Projeto:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('project', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Localização:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('location', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Severidade:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                                    <span style="padding: 4px 8px; border-radius: 3px; color: white; background-color: {'#d32f2f' if data.get('severity') == 'high' else '#f57c00' if data.get('severity') == 'medium' else '#388e3c'};">
                                        {{'Alta' if data.get('severity') == 'high' else 'Média' if data.get('severity') == 'medium' else 'Baixa'}}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Reportado por:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('reportedBy', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Atribuído a:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('assignedTo', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Data Limite:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('dueDate', '')}</td>
                            </tr>
                        </table>
                        
                        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0;"><strong>⚠️ Ação Necessária:</strong> Esta não conformidade requer atenção imediata. Por favor, acesse o sistema ConstructPro para mais detalhes e acompanhamento.</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="#" style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Acessar ConstructPro
                            </a>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                        
                        <p style="font-size: 12px; color: #666; text-align: center;">
                            Esta é uma notificação automática do sistema ConstructPro.  

                            Data/Hora: {datetime.now().strftime('%d/%m/%Y às %H:%M')}
                        </p>
                    </div>
                </body>
                </html>
                """
            }
        },
        "en": {
            "non_conformity": {
                "subject": f"New Non-Conformity: {data.get('title', '')}",
                "body": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">
                            🚨 New Non-Conformity Reported
                        </h2>
                        
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1976d2;">{data.get('title', '')}</h3>
                            <p><strong>Description:</strong> {data.get('description', '')}</p>
                        </div>
                        
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Project:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('project', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('location', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Severity:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                                    <span style="padding: 4px 8px; border-radius: 3px; color: white; background-color: {'#d32f2f' if data.get('severity') == 'high' else '#f57c00' if data.get('severity') == 'medium' else '#388e3c'};">
                                        {{'High' if data.get('severity') == 'high' else 'Medium' if data.get('severity') == 'medium' else 'Low'}}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Reported by:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('reportedBy', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Assigned to:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('assignedTo', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Due Date:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('dueDate', '')}</td>
                            </tr>
                        </table>
                        
                        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0;"><strong>⚠️ Action Required:</strong> This non-conformity requires immediate attention. Please access the ConstructPro system for more details and follow-up.</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="#" style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Access ConstructPro
                            </a>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                        
                        <p style="font-size: 12px; color: #666; text-align: center;">
                            This is an automatic notification from ConstructPro system.  

                            Date/Time: {datetime.now().strftime('%m/%d/%Y at %H:%M')}
                        </p>
                    </div>
                </body>
                </html>
                """
            }
        },
        "es": {
            "non_conformity": {
                "subject": f"Nueva No Conformidad: {data.get('title', '')}",
                "body": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">
                            🚨 Nueva No Conformidad Reportada
                        </h2>
                        
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1976d2;">{data.get('title', '')}</h3>
                            <p><strong>Descripción:</strong> {data.get('description', '')}</p>
                        </div>
                        
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Proyecto:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('project', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Ubicación:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('location', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Severidad:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                                    <span style="padding: 4px 8px; border-radius: 3px; color: white; background-color: {'#d32f2f' if data.get('severity') == 'high' else '#f57c00' if data.get('severity') == 'medium' else '#388e3c'};">
                                        {{'Alta' if data.get('severity') == 'high' else 'Media' if data.get('severity') == 'medium' else 'Baja'}}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Reportado por:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('reportedBy', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Asignado a:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('assignedTo', '')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Fecha Límite:</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{data.get('dueDate', '')}</td>
                            </tr>
                        </table>
                        
                        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0;"><strong>⚠️ Acción Requerida:</strong> Esta no conformidad requiere atención inmediata. Por favor, acceda al sistema ConstructPro para más detalles y seguimiento.</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="#" style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Acceder a ConstructPro
                            </a>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                        
                        <p style="font-size: 12px; color: #666; text-align: center;">
                            Esta es una notificación automática del sistema ConstructPro.  

                            Fecha/Hora: {datetime.now().strftime('%d/%m/%Y a las %H:%M')}
                        </p>
                    </div>
                </body>
                </html>
                """
            }
        }
    }

    return templates.get(language, templates["pt"]).get(
        notification_type, templates["pt"]["non_conformity"]
    )

def send_email(to_email, subject, body):
    """Envia email usando SMTP"""
    try:
        # Criar mensagem
        msg = MIMEMultipart("alternative")
        msg["From"] = EMAIL_USER
        msg["To"] = to_email
        msg["Subject"] = subject

        # Adicionar corpo HTML
        html_part = MIMEText(body, "html", "utf-8")
        msg.attach(html_part)

        # Conectar ao servidor SMTP e enviar
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        return True
    except Exception as e:
        print(f"Erro ao enviar email: {str(e)}")
        return False


@notifications_bp.route("/send-notification", methods=["POST"])
def send_notification():
    """Endpoint para enviar notificações por email"""
    try:
        data = request.get_json()

        notification_type = data.get("type", "non_conformity")
        notification_data = data.get("data", {})
        language = data.get("language", "pt")

        # Gerar template de email
        template = get_email_template(notification_type, notification_data, language)

        # Lista de emails para enviar (em produção, buscar do banco de dados)
        # Por enquanto, estamos usando um email fixo para demonstração
        to_emails = ["demo@constructpro.com", notification_data.get("assignedTo")]

        success = send_email(
            to_email=", ".join(filter(None, to_emails)),
            subject=template["subject"],
            body=template["body"],
        )

        if success:
            return jsonify({"message": "Notificação enviada com sucesso!"}), 200
        else:
            return jsonify({"error": "Falha ao enviar notificação"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
