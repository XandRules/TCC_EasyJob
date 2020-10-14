class ChatController {

  async index(req, res) {
    res.send('server is running');
  }

  async create(req, res) {
    return res.json({"connected": `server is running ${req.anuncio_id}`});
  }
}

export default new ChatController();
