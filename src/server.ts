import app from "./app";

const PORT = process.env.PORT || 5000;
app.get("/healthCheck",(req,res)=>{
    res.send({message:"running"})
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
