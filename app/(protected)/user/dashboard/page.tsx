'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface Record {
  id: number
  type: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  date: string
  supplierId: string
  supplierName: string
  customerId: string
  customerName: string
}
// Mock Prisma calls based on the provided schema
const prisma = {
  dispatch: {
    // @ts-ignore
    findMany: async ({ skip, take, where }) => {
      // This is a mock implementation
      return Array(take).fill(null).map((_, i) => ({
        id: i + skip,
        type: i % 2 === 0 ? 'input' : 'output',
        productId: Math.floor(Math.random() * 1000) + 1,
        productName: `Product ${i + skip}`,
        quantity: Math.floor(Math.random() * 100) + 1,
        unitPrice: Math.random() * 100,
        totalPrice: Math.random() * 1000,
        date: new Date().toISOString(),
        supplierId: Math.floor(Math.random() * 100) + 1,
        supplierName: `Supplier ${Math.floor(Math.random() * 100) + 1}`,
        customerId: Math.floor(Math.random() * 100) + 1,
        customerName: `Customer ${Math.floor(Math.random() * 100) + 1}`,
      }))
    },
    create: async (data: any) => {
      console.log('Creating dispatch:', data)
      return { id: Date.now(), ...data }
    },
  },
}

export default function ProductDispatch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [records, setRecords] = useState <Record[]> ([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newDispatch, setNewDispatch] = useState({
    type: 'input',
    productId: '',
    productName: '',
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0,
    supplierId: '',
    supplierName: '',
    customerId: '',
    customerName: '',
  })

  const fetchRecords = async (page = 1) => {
    const pageSize = 50
    const skip = (page - 1) * pageSize
    const result = await prisma.dispatch.findMany({
      skip,
      take: pageSize,
      where: {
        OR: [
          { productName: { contains: searchTerm } },
          { supplierName: { contains: searchTerm } },
          { customerName: { contains: searchTerm } },
        ],
      },
    })
    // @ts-ignore
    setRecords(result)
    setCurrentPage(page)
    // In a real application, you'd get the total count from the database
    setTotalPages(Math.ceil(100 / pageSize)) // Assuming 100 total records for this example
  }

  const handleSearch = () => {
    fetchRecords(1)
  }

  const handleCreateDispatch = async () => {
    await prisma.dispatch.create({
      data: newDispatch,
    })
    setIsCreateDialogOpen(false)
    fetchRecords(currentPage)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search products, suppliers, or customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Dispatch</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Dispatch</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newDispatch.type}
                  onValueChange={(value) => setNewDispatch({ ...newDispatch, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="input">Input</SelectItem>
                    <SelectItem value="output">Output</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productId" className="text-right">
                  Product ID
                </Label>
                <Input
                  id="productId"
                  value={newDispatch.productId}
                  onChange={(e) => setNewDispatch({ ...newDispatch, productId: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productName" className="text-right">
                  Product Name
                </Label>
                <Input
                  id="productName"
                  value={newDispatch.productName}
                  onChange={(e) => setNewDispatch({ ...newDispatch, productName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newDispatch.quantity}
                  onChange={(e) => setNewDispatch({ ...newDispatch, quantity: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unitPrice" className="text-right">
                  Unit Price
                </Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={newDispatch.unitPrice}
                  onChange={(e) => setNewDispatch({ ...newDispatch, unitPrice: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalPrice" className="text-right">
                  Total Price
                </Label>
                <Input
                  id="totalPrice"
                  type="number"
                  value={newDispatch.totalPrice}
                  onChange={(e) => setNewDispatch({ ...newDispatch, totalPrice: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplierId" className="text-right">
                  Supplier ID
                </Label>
                <Input
                  id="supplierId"
                  value={newDispatch.supplierId}
                  onChange={(e) => setNewDispatch({ ...newDispatch, supplierId: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplierName" className="text-right">
                  Supplier Name
                </Label>
                <Input
                  id="supplierName"
                  value={newDispatch.supplierName}
                  onChange={(e) => setNewDispatch({ ...newDispatch, supplierName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerId" className="text-right">
                  Customer ID
                </Label>
                <Input
                  id="customerId"
                  value={newDispatch.customerId}
                  onChange={(e) => setNewDispatch({ ...newDispatch, customerId: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerName" className="text-right">
                  Customer Name
                </Label>
                <Input
                  id="customerName"
                  value={newDispatch.customerName}
                  onChange={(e) => setNewDispatch({ ...newDispatch, customerName: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleCreateDispatch}>Create</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Supplier ID</TableHead>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Customer Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.productId}</TableCell>
              <TableCell>{record.productName}</TableCell>
              <TableCell>{record.quantity}</TableCell>
              <TableCell>{record.unitPrice.toFixed(2)}</TableCell>
              <TableCell>{record.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
              <TableCell>{record.supplierId}</TableCell>
              <TableCell>{record.supplierName}</TableCell>
              <TableCell>{record.customerId}</TableCell>
              <TableCell>{record.customerName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center space-x-2 mt-4">
        <Button
          onClick={() => fetchRecords(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="py-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => fetchRecords(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}