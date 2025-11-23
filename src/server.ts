import app from "./app";
import { AppDataSource } from "./datasource";
import dotenv from "dotenv";
dotenv.config();

//comentar banco de dados
/*try {
    AppDataSource.initialize();
    console.log('Conexão com o Banco de Dados efetuada com sucesso');
} catch(err){
    console.error('Erro de conexão com o DB', err);
    process.exit(1);
}
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
    console.log(`API está pronta para uso`);
    console.log(`Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
    console.log('─'.repeat(60));
});