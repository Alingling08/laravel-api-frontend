<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with('user')->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|min:3',
            'description' => 'required|string',
            'price' => 'required|numeric|min:1',
            'sku' => 'required|string|max:50|unique:products',
            'brand' => 'required|string',
            // 'image' => 'required|file|max:1000|mimes:jpg,bmp,png,webp',
            'category' => 'required|string|max:50',
            'stock' => 'required|numeric|min:1',
            // 'feature_id' => 'required|exists:features,id'
        ]);

        $product = $request->user()->products()->create($validatedData);

        return ['product' => $product, 'user' => $product->user, 'message' => 'Product created successfully'];
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return ['product' => $product, 'user' => $product->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        Gate::authorize('modify', $product);
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|min:3',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'sku' => 'string|max:50|unique:products',
            // 'image' => 'required|file|max:1000|mimes:jpg,bmp,png,webp',
            'category' => 'required|string|max:50',
            'stock' => 'required|numeric|min:0',
            // 'feature_id' => 'required|exists:features,id'
        ]);

        $product->update($validatedData);

        return ['product' => $product, 'message' => 'Product updated successfully'];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('modify', $product);
        $product->delete();
        return ['message' => 'Product deleted successfully'];
    }
}
