const Termek = require('../models/Termek');

exports.getAllItemsFrontend = async (req, res) => {
  try {
    const items = await Termek.find({});
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ msg: error?.message || 'Szerver hiba' });
  }
};

// ✅ készlet csökkentés: csak akkor von le, ha van elég készlet (nem mehet mínuszba)
exports.decreaseStockFrontend = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = Number(req.body.quantity);

    if (!qty || qty < 1) {
      return res.status(400).json({ msg: 'Hibás mennyiség!' });
    }

    // Atomikus csökkentés: csak ha mennyiseg >= qty
    const updated = await Termek.findOneAndUpdate(
      { _id: id, mennyiseg: { $gte: qty } },
      { $inc: { mennyiseg: -qty } },
      { new: true }
    );

    if (!updated) {
      return res.status(409).json({ msg: 'Nincs ennyi készleten!' });
    }

    return res.status(200).json({
      ok: true,
      mennyiseg: updated.mennyiseg,
      item: updated,
    });
  } catch (error) {
    return res.status(500).json({ msg: error?.message || 'Szerver hiba' });
  }
};

// ✅ készlet növelés: visszaadjuk a készletre (pl. kosárból törlésnél)
exports.increaseStockFrontend = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = Number(req.body.quantity);

    if (!qty || qty < 1) {
      return res.status(400).json({ msg: 'Hibás mennyiség!' });
    }

    const updated = await Termek.findByIdAndUpdate(
      { _id: id },
      { $inc: { mennyiseg: qty } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: 'Termék nem található!' });
    }

    return res.status(200).json({
      ok: true,
      mennyiseg: updated.mennyiseg,
      item: updated,
    });
  } catch (error) {
    return res.status(500).json({ msg: error?.message || 'Szerver hiba' });
  }
};
