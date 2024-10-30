// admin.js
const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/gurad"); // Authorization middleware
const adminController = require("../controllers/admin");

/**
 * @swagger
 * /api/admin/getUsers:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Admin]
 *     security:
 *       - tokenAuth: []  // Ensures tokenAuth is applied to this route
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/getUsers", adminController.getUsers);



/**
 * @swagger
 * /api/admin/getCompanies:
 *   get:
 *     summary: Retrieve all companies
 *     tags: [Admin]
 *     security:
 *       -tokenAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       404:
 *         description: No companies found
 *       500:
 *         description: Server error
 */
router.get("/getCompanies", fetchUser, adminController.getCompanies);

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Retrieve dashboard data
 *     tags: [Admin]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCount:
 *                   type: integer
 *                   description: Total number of users
 *       500:
 *         description: Server error
 */
router.get("/dashboard", fetchUser, adminController.getDashboardData);

module.exports = router;
