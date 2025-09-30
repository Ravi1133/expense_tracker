import app from "./app";
import { updateTransaction } from "./controllers/transactions";


const PORT = process.env.PORT || 5000;
app.get("/healthCheck",(req,res)=>{
    res.send({message:"running"})
})

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});